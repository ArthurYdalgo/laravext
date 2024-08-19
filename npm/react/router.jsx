import { clientRender } from "./tools.jsx";
import { endProgress, startProgress } from "./progress.jsx";
import axios from "axios";
import React from "react";

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

    startProgress();

    const laravext = window.__laravext;

    if (options?.redirectToUrlIntended) {
        url = laravext.page_data.url_intended ?? url;
    }

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
                window.location.href = url;
                return;
            }

            let location = data.path ?? url;

            if (data.action == "redirect") {
                window.location.href = data.url;
                return;
            }

            let currentScroll = { x: window.scrollX, y: window.scrollY };

            try {
                if (!laravext.app.disablePushedStateData()) {
                    let currentState = {
                        ...history.state,
                        laravext_page_data: laravext.page_data,
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

                clientRender(data.laravext_page_data, { x: 0, y: 0 });

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
