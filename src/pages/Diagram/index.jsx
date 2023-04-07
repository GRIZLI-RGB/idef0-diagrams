import { useEffect, useState } from "react";
import "./Diagram.scss";
import { useNavigate, useParams } from "react-router-dom";
import rll from "react-leader-line";
import { DiagramBlock } from "../../components/DiagramBlock";
import { Popup } from "../../components/Popup";

export const Diagram = () => {
    const params = useParams();

    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);

    const [currentDiagrams, setCurrentDiagrams] = useState([
        // {
        //     id: 1,
        //     name: "Аутентификация",
        //     inputs: ["Имя пользователя", "Пароль пользователя"],
        //     outputs: ["Пользователь аутентифицирован"],
        //     controls: ["Сервер", "База данных"],
        //     mechanims: ["CRM-система", "Менеджер отдела"],
        // },
        // {
        //     id: 2,
        //     name: "Ввод данных",
        //     inputs: ["Имя пользователя", "Пароль пользователя"],
        //     outputs: ["Успешный вход"],
        //     controls: ["База данных"],
        //     mechanims: ["Пользователь"],
        // },
        // {
        //     id: 3,
        //     name: "Ввод данных типичного юзера",
        //     inputs: ["Имя пользователя", "Пароль пользователя"],
        //     outputs: ["Успешный вход"],
        //     controls: ["База данных"],
        //     mechanims: ["Пользователь"],
        // },
    ]);

    const [popupCreateIDEF0, setPopupCreateIDEF0] = useState(false);

    // Забирает из локального хранилища существующие проекты и текущую диаграмму
    useEffect(() => {
        localStorage.getItem("diagrams") ? setProjects(JSON.parse(localStorage.getItem("diagrams"))) : null;
        localStorage.getItem(`diagram-${params.id}`)
            ? setCurrentDiagrams(JSON.parse(localStorage.getItem(`diagram-${params.id}`)))
            : null;
    }, []);
    
    useEffect(() => {
        let rllParams = {
            color: "#353535",
            size: 2,
            path: "grid",
        };
        currentDiagrams.map(diagram => {
            Array.from(document.getElementsByClassName(`diagramBlock__ul-li-${diagram.id}`)).forEach(el => {
                new rll(el, document.getElementById(`diagramBlock-${diagram.id}`), rllParams);
            });
        });
    }, [currentDiagrams]);

    const saveDiagram = () => {
        localStorage.setItem(`diagram-${params.id}`, JSON.stringify(currentDiagrams));
    };

    const createIDEF0 = () => {
        let blockName = document.getElementById("input-blockName")?.value;
        let inputs = document.getElementById("input-inputs")?.value.split(",").map(item => item.trim()).map(item => item.charAt(0).toUpperCase() + item.slice(1));
        let outputs = document.getElementById("input-outputs")?.value.split(",").map(item => item.trim()).map(item => item.charAt(0).toUpperCase() + item.slice(1));
        let controls = document.getElementById("input-controls")?.value.split(",").map(item => item.trim()).map(item => item.charAt(0).toUpperCase() + item.slice(1));
        let mechanisms = document.getElementById("input-mechanisms")?.value.split(",").map(item => item.trim()).map(item => item.charAt(0).toUpperCase() + item.slice(1));
        setCurrentDiagrams([...currentDiagrams, {
            id: Number(currentDiagrams[currentDiagrams?.length - 1]?.id ? currentDiagrams[currentDiagrams.length - 1]?.id : 1),
            name: blockName,
            inputs,
            outputs,
            controls,
            mechanisms
        }])
    }

    // Удаление проекта
    const deleteProject = () => {
        let projects_copy = [...projects].filter(({ id }) => id.toString() !== params.id.toString());
        setProjects([...projects_copy]);
        localStorage.setItem("diagrams", JSON.stringify(projects_copy));
    };

    return (
        <>
            <header className="header">
                <img className="header__btn header__btn-back" src="/img/back.svg" alt="" onClick={() => navigate(-1)} />
                <div>
                    <h1 className="header__title">
                        {projects.map(({ id, title }) => (id.toString() === params.id.toString() ? title : ""))}
                    </h1>
                    {currentDiagrams.length !== 0 && (
                        <>
                            <img className="header__btn header__btn-more" src="/img/more.svg" alt="" />
                            <img className="header__btn header__btn-tree" src="/img/tree.svg" alt="" />
                        </>
                    )}
                    <img
                        className="header__btn header__btn-delete"
                        src="/img/delete.svg"
                        alt=""
                        onClick={() => {
                            deleteProject();
                            navigate("/");
                        }}
                    />
                </div>
                <button className="header__save" onClick={() => saveDiagram()}>
                    Сохранить
                </button>
            </header>
            <div className="diagram">
                {currentDiagrams.length === 0 ? (
                    <button className="diagram__add" onClick={() => setPopupCreateIDEF0(true)}>
                        <img src="/img/add-grey.svg" alt="" />
                        Добавить IDEF0
                    </button>
                ) : (
                    <div className="diagram__items">
                        {currentDiagrams.map(diagram => (
                            <DiagramBlock
                                styles={{
                                    marginTop: `${(diagram.id - 1) * 200}px`,
                                    marginLeft: "85px",
                                }}
                                currentDiagram={diagram}
                            />
                        ))}
                    </div>
                )}
            </div>
            <Popup active={popupCreateIDEF0} setActive={(arg) => setPopupCreateIDEF0(arg)}>
                <div class="createIDEF0">
                    <div>
                        <h6>Название блока</h6>
                        <input id="input-blockName" type="text" placeholder="Варить борщ" />
                    </div>
                    <div>
                        <h6>Inputs</h6>
                        <input id="input-inputs" type="text" placeholder="Овощи, мясо, капуста" />
                    </div>
                    <div>
                        <h6>Outputs</h6>
                        <input id="input-outputs" type="text" placeholder="Борщ, суп" />
                    </div>
                    <div>
                        <h6>Controls</h6>
                        <input id="input-controls" type="text" placeholder="Кулинарная книга, советы мамы" />
                    </div>
                    <div>
                        <h6>Mechanisms</h6>
                        <input id="input-mechanisms" type="text" placeholder="Мама, бабушка" />
                    </div>
                    <button onClick={() => {
                        createIDEF0()
                        setPopupCreateIDEF0(false)
                    }}>Создать</button>
                </div>
            </Popup>
        </>
    );
};
