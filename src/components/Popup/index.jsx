import "./Popup.scss";

export const Popup = ({ active = false, setActive, children }) => {
    return (
        active && (
            <div className="popup">
                <div className="popup__body">
                    <img className="popup__body-close" src="/img/close.svg" alt="" onClick={() => setActive(false)} />
                    {children}
                </div>
            </div>
        )
    );
};
