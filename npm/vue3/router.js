import { isEnvProduction, clientRender } from "./tools";
import { endProgress, startProgress } from "./progress";
import axios from "axios";

export function visit(
    url,
    options = {
        preserveScroll: false,
        redirectToUrlIntended: true,
    }
) {
    if (!history?.pushState) {
        window.location.href = url;
        return;
    }

    if (!isEnvProduction()) {
        console.debug(`Visiting page at ${url}`);
    }

    startProgress();

    const laravext = window.__laravext;

    console.log({url});

    if (options?.redirectToUrlIntended) {
        url = laravext.page_data.url_intended ?? url;
    }

    console.log({url});

    axios
        .get(url, {
            headers: {
                "Cache-Control": "no-cache, no-store, must-revalidate",
                Pragma: "no-cache",
                Accept: "text/html, application/xhtml+xml",
                "X-Requested-With": "XMLHttpRequest",
                Expires: "0",
                "X-Laravext": true,
                "X-Laravext-Version": laravext.page_data.version,
                "X-Laravext-Root-View": laravext.page_data.root_view,
            },
        })
        .then(async ({ data, headers }) => {
            if (!headers["x-laravext"]) {
                if (!isEnvProduction()) {
                    console.debug(
                        "Laravext header not found in response. Redirecting"
                    );
                }
                window.location.href = url;
                return;
            }

            let location = data.path ?? url;

            if (!isEnvProduction()) {
                console.debug(`Loading page at ${url}`, data);
            }

            if (data.action == "redirect") {
                window.location.href = data.url;
                return;
            }

            let currentScroll = { x: window.scrollX, y: window.scrollY };

            try {
                if (!laravext.app.disablePushedStateData()) {
                    let currentState = {
                        ...history.state,
                        laravext_page_data: window.__laravext.page_data,
                        scroll_state: options?.preserveScroll
                            ? currentScroll
                            : { x: 0, y: 0 },
                    };

                    history.replaceState(
                        currentState,
                        "",
                        window.location.href
                    );
                }

                window.__laravext.page_data = data.laravext_page_data;

                clientRender({ x: 0, y: 0 });

                let newState = {
                    laravext_page_data: data.laravext_page_data,
                };

                history.pushState(
                    laravext.app.disablePushedStateData() ? {} : newState,
                    "",
                    location
                );
            } catch (error) {
                console.error("Error updating page data:", error);
                window.location.href = location;
            }

            endProgress();
        });
}
