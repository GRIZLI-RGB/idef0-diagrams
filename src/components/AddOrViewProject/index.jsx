import "./AddOrViewProject.scss";

export const AddOrViewProject = ({ state = "add", title, click }) => {
    return state === "add" ? (
        <div className="AddOrViewProject AddOrViewProject--add" onClick={click}>
            <img src="/img/add.svg" alt="" />
            <p>Создать новую диаграмму</p>
        </div>
    ) : (
        <div className="AddOrViewProject AddOrViewProject--view">
            <img src="/img/view.svg" alt="" />
            <p>{title}</p>
        </div>
    );
};
