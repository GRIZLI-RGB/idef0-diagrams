import { useEffect, useState } from "react";
import "./Home.scss";
import { AddOrViewProject } from "../../components/AddOrViewProject";
import { Popup } from "../../components/Popup";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export const Home = () => {
    const [popupAdd, setPopupAdd] = useState(false);

    const [projects, setProjects] = useState([]);

    // Забирает из локального хранилища существующие проекты
    useEffect(() => {
        localStorage.getItem("diagrams") ? setProjects(JSON.parse(localStorage.getItem("diagrams"))) : null;
        Array.from(document.getElementsByClassName("leader-line")).forEach(el => el.remove());
    }, []);

    // Создаёт новый проект при нажатии на кнопку "Создать новую диаграмму"
    const createProject = () => {
        let title = document.getElementById("input-name-diagram").value;
        let lastID = projects.length > 0 ? projects[projects.length - 1].id : 0;
        let newProjects = [...projects, { id: lastID + 1, title }];
        setProjects(newProjects);
        localStorage.setItem("diagrams", JSON.stringify(newProjects));
        toast.success(`Проект ${title} успешно создан`)
    };

    return (
        <>
            <Toaster position="bottom-right"/>
            <div className="home">
                <h1 className="home__title">Мои диаграммы</h1>
                <div className="home__items">
                    <AddOrViewProject click={() => setPopupAdd(true)} />
                    {projects.map(({ id, title }) => (
                        <Link to={`/diagram/${id}`} key={id}>
                            <AddOrViewProject state="view" title={title} />
                        </Link>
                    ))}
                </div>
            </div>
            <Popup active={popupAdd} setActive={arg => setPopupAdd(arg)}>
                <input
                    id="input-name-diagram"
                    style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "2px solid #ccc",
                    }}
                    type="text"
                    placeholder="Название диаграммы"
                />
                <button
                    style={{
                        display: "block",
                        width: "100%",
                        marginTop: "8px",
                        padding: "12px",
                        fontSize: "16px",
                        border: "2px solid #ccc",
                        borderRadius: "100px",
                        color: "#ccc",
                        fontWeight: "500",
                    }}
                    onClick={() => {
                        createProject();
                        setPopupAdd(false);
                    }}>
                    Создать
                </button>
            </Popup>
        </>
    );
};
