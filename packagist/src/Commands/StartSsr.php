<?php

namespace Laravext\Commands;

use Laravext\Ssr\SsrException;
use Illuminate\Console\Command;
use Laravext\Ssr\BundleDetector;
use Symfony\Component\Process\Process;
use Symfony\Component\Console\Attribute\AsCommand;

#[AsCommand(name: 'laravext:start-ssr')]
class StartSsr extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $signature = 'laravext:start-ssr {--runtime=node : The runtime to use (`node` or `bun`)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start the Laravext SSR server';

    /**
     * Start the SSR server via a Node process.
     */
    public function handle(): int
    {
        if (! config('laravext.ssr.enabled', true)) {
            $this->error('Laravext SSR is not enabled. Enable it via the `laravext.ssr.enabled` config option.');

            return self::FAILURE;
        }

        $bundle = (new BundleDetector())->detect();
        $configuredBundle = config('laravext.ssr.bundle');

        if ($bundle === null) {
            $this->error(
                $configuredBundle
                    ? 'Laravext SSR bundle not found at the configured path: "'.$configuredBundle.'"'
                    : 'Laravext SSR bundle not found. Set the correct Laravext SSR bundle path in your `laravext.ssr.bundle` config.'
            );

            return self::FAILURE;
        } elseif ($configuredBundle && $bundle !== $configuredBundle) {
            $this->warn('Laravext SSR bundle not found at the configured path: "'.$configuredBundle.'"');
            $this->warn('Using a default bundle instead: "'.$bundle.'"');
        }

        $runtime = $this->option('runtime');

        if (! in_array($runtime, ['node', 'bun'])) {
            $this->error('Unsupported runtime: "'.$runtime.'". Supported runtimes are `node` and `bun`.');

            return self::INVALID;
        }

        $this->callSilently('laravext:stop-ssr');

        $process = new Process([$runtime, $bundle]);
        $process->setTimeout(null);
        $process->start();

        if (extension_loaded('pcntl')) {
            $stop = function () use ($process) {
                $process->stop();
            };
            pcntl_async_signals(true);
            pcntl_signal(SIGINT, $stop);
            pcntl_signal(SIGQUIT, $stop);
            pcntl_signal(SIGTERM, $stop);
        }

        foreach ($process as $type => $data) {
            if ($process::OUT === $type) {
                $this->info(trim($data));
            } else {
                $this->error(trim($data));
                report(new SsrException($data));
            }
        }

        return self::SUCCESS;
    }
}
