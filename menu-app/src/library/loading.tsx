import { useState } from "react";

function globalLoading(bool: boolean = true) {
    const [loading, setLoading] = useState(bool);

    const setLoadingState = (val: boolean) => {
        setLoading(val);
    }
    return { loading, setLoadingState}
}

export default globalLoading;