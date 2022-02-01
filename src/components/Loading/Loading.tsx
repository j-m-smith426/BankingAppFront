import { FC, Fragment } from "react";
import { Oval } from "react-loader-spinner";

const Loading:FC = () => {
    return (
        <Fragment>
            <Oval  height="100"
    width="100"
    color='grey'
                ariaLabel='loading'
            />
        </Fragment>
    );
}

export default Loading;