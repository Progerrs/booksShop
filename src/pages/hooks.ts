import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import { dom } from "shared/lib";

export const useResetScrollAtEveryPage = () => {
    const history = useHistory();
    const prev = useRef<string>();

    useEffect(() => {
        const unlisten = history.listen((location) => {
            if (prev.current !== location.pathname) {
                dom.scrollToTop();
            }

            prev.current = location.pathname;
        });
        return () => {
            unlisten();
        };
    }, [history]);
};
