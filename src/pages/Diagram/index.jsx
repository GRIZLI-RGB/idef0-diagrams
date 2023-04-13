import { useEffect, useState } from "react";
import "./Diagram.scss";
import { useNavigate, useParams } from "react-router-dom";
import { DiagramBlock } from "../../components/DiagramBlock";
import { Popup } from "../../components/Popup";
import { Tooltip } from "react-tooltip";
import { Toaster, toast } from "react-hot-toast";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

export const Diagram = () => {
    const params = useParams();

    const navigate = useNavigate();

    const [currentLevel, setCurrentLevel] = useState("A1");

    const [currentDiagrams, setCurrentDiagrams] = useState(
        {
            "A0": [
                {
                    id: 1,
                    name: "Аутентификация",
                    inputs: ["Имя пользователя", "Пароль пользователя"],
                    outputs: ["Пользователь аутентифицирован"],
                    controls: ["Сервер", "База данных"],
                    mechanisms: ["CRM-система", "Менеджер отдела"],
                }
            ],
            "A1": [
                {
                    id: 1,
                    name: "Регистрация",
                    inputs: ["Имя пользователя", "Пароль пользователя"],
                    outputs: ["Пользователь аутентифицирован"],
                    controls: ["Сервер", "База данных"],
                    mechanisms: ["CRM-система", "Менеджер отдела"],
                },
                {
                    id: 2,
                    name: "Вход",
                    inputs: ["Имя пользователя", "Пароль пользователя"],
                    outputs: ["Пользователь аутентифицирован"],
                    controls: ["Сервер", "База данных"],
                    mechanisms: ["CRM-система", "Менеджер отдела"],
                }
            ]
        }
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
    );

    const [treeDiagrams, setTreeDiagrams] = useState(false);

    const [projects, setProjects] = useState([]);

    // Подгружаем из localStorage все проекты и текущую диаграмму
    useEffect(() => {
        localStorage.getItem("diagrams") ? setProjects(JSON.parse(localStorage.getItem("diagrams"))) : null;
        // localStorage.getItem(`diagram-${params.id}`)
        //     ? setCurrentDiagrams(JSON.parse(localStorage.getItem(`diagram-${params.id}`)))
        //     : null;
    }, []);

    const [popupCreateIDEF0, setPopupCreateIDEF0] = useState(false);

    const createIDEF0 = () => {
        let blockName = document.getElementById("input-blockName")?.value;
        let inputs = document
            .getElementById("input-inputs")
            ?.value.split(",")
            .map(item => item.trim())
            .map(item => item.charAt(0).toUpperCase() + item.slice(1));
        let outputs = document
            .getElementById("input-outputs")
            ?.value.split(",")
            .map(item => item.trim())
            .map(item => item.charAt(0).toUpperCase() + item.slice(1));
        let controls = document
            .getElementById("input-controls")
            ?.value.split(",")
            .map(item => item.trim())
            .map(item => item.charAt(0).toUpperCase() + item.slice(1));
        let mechanisms = document
            .getElementById("input-mechanisms")
            ?.value.split(",")
            .map(item => item.trim())
            .map(item => item.charAt(0).toUpperCase() + item.slice(1));
        setCurrentDiagrams([
            ...currentDiagrams,
            {
                id: Number(
                    currentDiagrams[currentDiagrams?.length - 1]?.id
                        ? currentDiagrams[currentDiagrams.length - 1]?.id
                        : 1,
                ),
                name: blockName,
                inputs,
                outputs,
                controls,
                mechanisms,
            },
        ]);
    };

    // Сохранить диаграмму
    const saveDiagram = () => {
        localStorage.setItem(`diagram-${params.id}`, JSON.stringify(currentDiagrams));
    };

    // Удаление проекта
    const deleteProject = () => {
        let projects_copy = [...projects].filter(({ id }) => id.toString() !== params.id.toString());
        setProjects([...projects_copy]);
        localStorage.setItem("diagrams", JSON.stringify(projects_copy));
        localStorage.removeItem(`diagram-${params.id}`);
    };

    return (
        <>
            <Toaster position="bottom-right" />
            <Tooltip
                id="tooltip"
                style={{
                    fontSize: "14px",
                    padding: "7px",
                    zIndex: "100",
                }}
            />
            <div className="diagramWrapper">
                <div className="diagramWrapper__header">
                    <div className="diagramWrapper__header-info">
                        <p>
                            <span>Project:</span> {projects.filter(({ id }) => id == params?.id)[0]?.title}
                        </p>
                        <p>
                            <span>Author:</span> Milena Oganesyan
                        </p>
                        <p>
                            <span>Date create:</span>{" "}
                            {
                                projects
                                    .filter(({ id }) => id == params?.id)[0]
                                    ?.date_create?.toLocaleString()
                                    .split("T")[0]
                            }
                        </p>
                    </div>
                    <div className="diagramWrapper__header-btns">
                        <img
                            className="diagramWrapper__header-btns-btn diagramWrapper__header-btns-btn-back"
                            src="/img/back.svg"
                            alt=""
                            onClick={() => navigate(-1)}
                            data-tooltip-content="На главную"
                            data-tooltip-id="tooltip"
                        />
                        <div>
                            {currentDiagrams.length !== 0 && (
                                <>
                                    <img
                                        className="diagramWrapper__header-btns-btn diagramWrapper__header-btns-btn-more"
                                        src="/img/more.svg"
                                        alt=""
                                        data-tooltip-content="Расширить диаграмму"
                                        data-tooltip-id="tooltip"
                                    />
                                    <img
                                        onClick={() => setTreeDiagrams(true)}
                                        className="diagramWrapper__header-btns-btn diagramWrapper__header-btns-btn-tree"
                                        src="/img/tree.svg"
                                        alt=""
                                        data-tooltip-content="Отобразить дерево диаграмм"
                                        data-tooltip-id="tooltip"
                                    />
                                </>
                            )}
                            <img
                                className="diagramWrapper__header-btns-btn diagramWrapper__header-btns-btn-delete"
                                src="/img/delete.svg"
                                alt=""
                                data-tooltip-content="Удалить проект"
                                data-tooltip-id="tooltip"
                                onClick={() => {
                                    deleteProject();
                                    navigate("/");
                                }}
                            />
                        </div>
                        <button
                            className="diagramWrapper__header-btns-save"
                            onClick={() => {
                                saveDiagram();
                                toast.success("Сохранено");
                            }}>
                            Сохранить
                        </button>
                    </div>
                </div>
                <div className="diagramWrapper__content">
                    {
                        treeDiagrams ? (
                            <div className="diagramWrapper__content-tree">
                                {
                                    Object.keys(currentDiagrams).map((level) => {
                                        return (<div className="diagramWrapper__content-tree-levelLine">
                                            {
                                                currentDiagrams[level].map(diagram => <div className="diagramWrapper__content-tree-levelLine-item" onClick={() => {
                                                    setCurrentLevel(level);
                                                    setTreeDiagrams(false);
                                                }}>{level === "A0" ? level : level + diagram?.id}</div>)
                                            }
                                        </div>)
                                    })  
                                }
                            </div> 
                        ) : (
                            <div className="diagram">
                            {currentDiagrams?.A0?.length <= 0 ? (
                                <button className="diagram__add" onClick={() => setPopupCreateIDEF0(true)}>
                                    <img src="/img/add-grey.svg" alt="" />
                                    Добавить IDEF0
                                </button>
                            ) : (
                                <TransformWrapper>
                                    <TransformComponent>
                                        <div className="diagram__items">
                                            {
                                                // level - перебираем уровни типа A0, A1, A2...
                                                Object.keys(currentDiagrams).map((level) => {
                                                    return (level === currentLevel) ? (
                                                        // diagram - перебираем диаграммы внутри уровней (id 1, id 2, id 3)
                                                        currentDiagrams[level].map(diagram => {
                                                            return (<DiagramBlock styles={{
                                                                marginTop: `${(diagram.id - 1) * 500}px`,
                                                                // marginLeft: "300px",
                                                            }} currentDiagrams={currentDiagrams} currentLevel={currentLevel} currentDiagram={diagram} itemsOnLevel={currentDiagrams[level].length} />)
                                                        })
                                                    ) : null
                                                })
                                            }
                                        </div>
                                    </TransformComponent>
                                </TransformWrapper>
                            )}
                    </div>
                    )
                    }
                </div>
                <div className="diagramWrapper__footer">
                    <div>
                        <h6>Node:</h6>
                        <div>{currentLevel}</div>
                    </div>
                    <div>
                        <h6>Title:</h6>
                        <div>—</div>
                    </div>
                    <div>
                        <h6>System ID:</h6>
                        <div>—</div>
                    </div>
                </div>
            </div>
            <Popup active={popupCreateIDEF0} setActive={arg => setPopupCreateIDEF0(arg)}>
                <div class="createIDEF0">
                    <div>
                        <h6>
                            Название блока<span style={{ color: "#ff0000" }}>*</span>
                        </h6>
                        <input id="input-blockName" type="text" placeholder="Варить борщ" />
                    </div>
                    <div>
                        <h6>
                            Inputs<span style={{ color: "#ff0000" }}>*</span>
                        </h6>
                        <input id="input-inputs" type="text" placeholder="Овощи, мясо, капуста" />
                    </div>
                    <div>
                        <h6>
                            Outputs<span style={{ color: "#ff0000" }}>*</span>
                        </h6>
                        <input id="input-outputs" type="text" placeholder="Борщ, суп" />
                    </div>
                    <div>
                        <h6>
                            Controls<span style={{ color: "#ff0000" }}>*</span>
                        </h6>
                        <input id="input-controls" type="text" placeholder="Кулинарная книга, советы мамы" />
                    </div>
                    <div>
                        <h6>
                            Mechanisms<span style={{ color: "#ff0000" }}>*</span>
                        </h6>
                        <input id="input-mechanisms" type="text" placeholder="Мама, бабушка" />
                    </div>
                    <button
                        onClick={() => {
                            createIDEF0();
                            setPopupCreateIDEF0(false);
                        }}>
                        Создать
                    </button>
                </div>
            </Popup>
        </>
    );
};
