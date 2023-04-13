import Xarrow from "react-xarrows";
import "./DiagramBlock.scss";

export const DiagramBlock = ({ currentDiagram, currentDiagrams, currentLevel, styles }) => {
    console.log(currentDiagrams[currentLevel])
    return (
        <div className="diagramBlock" id={`diagramBlock-${currentDiagram?.id}`} style={styles}>
            <h6 className="diagramBlock__name">{currentDiagram?.name}</h6>
            <p className="diagramBlock__id">{currentLevel === "A0" ? "A0" : currentLevel + currentDiagram?.id}</p>
            {/* {currentDiagram?.inputs?.length > 0 && (
                <ul className="diagramBlock__ul diagramBlock__inputs">
                    {currentDiagram.inputs.map((input, index) => (
                        <>
                            <li id={`input-${index}`} className={`diagramBlock__ul-li diagramBlock__inputs-input diagramBlock__ul-li-${currentDiagram.id}`}></li>
                            <Xarrow
                                start={`input-${index}`}
                                end={`diagramBlock-${currentDiagram?.id}`}
                                color="#353535"
                                strokeWidth={1}
                                gridBreak="90%"
                                path="grid"
                                labels={{start: <span style={{
                                    fontSize: "10px",
                                    maxWidth: "80px",
                                    display: "block",
                                    transform: "translateX(-105%)"
                                }}>{input}</span>}}
                            />
                        </>
                    ))}
                </ul>
            )}
            {currentDiagram?.outputs?.length > 0 && (
                <ul className="diagramBlock__ul diagramBlock__outputs">
                    {currentDiagram.outputs.map((output, index) => (
                        <>
                            <li id={`output-${index}`} className={`diagramBlock__ul-li diagramBlock__outputs-input diagramBlock__ul-li-${currentDiagram.id}`}></li>
                            <Xarrow
                                start={`diagramBlock-${currentDiagram?.id}`}
                                end={`output-${index}`}
                                color="#353535"
                                strokeWidth={1}
                                gridBreak="90%"
                                path="grid"
                                labels={{end: <span style={{
                                    fontSize: "10px",
                                    maxWidth: "80px",
                                    display: "block",
                                    transform: "translateX(105%)"
                                }}>{output}</span>}}
                            />
                        </>
                    ))}
                </ul>
            )}
            {currentDiagram?.controls?.length > 0 && (
                <ul className="diagramBlock__ul diagramBlock__controls">
                    {currentDiagram.controls.map((control, index) => (
                        <>
                            <li id={`control-${index}`} className={`diagramBlock__ul-li diagramBlock__controls-input diagramBlock__ul-li-${currentDiagram.id}`}>{control}</li>
                            <Xarrow
                                start={`control-${index}`}
                                end={`diagramBlock-${currentDiagram?.id}`}
                                color="#353535"
                                strokeWidth={1}
                                gridBreak="90%"
                                path="grid"
                            />
                        </>
                    ))}
                </ul>
            )}
            {currentDiagram?.mechanisms?.length > 0 && (
                <ul className="diagramBlock__ul diagramBlock__mechanims">
                    {currentDiagram?.mechanisms?.map((mechanim, index) => (
                        <>
                        <li id={`mechanim-${index}`} className={`diagramBlock__ul-li diagramBlock__mechanims-input diagramBlock__ul-li-${currentDiagram.id}`}>{mechanim}</li>
                        <Xarrow
                            start={`mechanim-${index}`}
                            end={`diagramBlock-${currentDiagram?.id}`}
                            color="#353535"
                            strokeWidth={1}
                            gridBreak="90%"
                            path="grid"
                        /></>
                    ))}
                </ul>
            )} */}
            {currentDiagram?.inputs?.length > 0 && (
                <ul className="diagramBlock__ul diagramBlock__inputs">
                    {currentDiagram.inputs.map((input, index) => (
                        <>
                            <li id={`input-${index}-${currentDiagram?.id}`} className={`diagramBlock__ul-li diagramBlock__inputs-input diagramBlock__ul-li-${currentDiagram.id}`}></li>
                            <Xarrow
                                start={`input-${index}-${currentDiagram?.id}`}
                                end={`diagramBlock-${currentDiagram?.id}`}
                                color="#353535"
                                strokeWidth={1}
                                gridBreak="90%"
                                path="grid"
                                labels={{start: <span style={{
                                    fontSize: "10px",
                                    maxWidth: "80px",
                                    display: "block",
                                    transform: "translateX(-105%)"
                                }}>{input}</span>}}
                            />
                        </>
                    ))}
                </ul>
            )}
            {currentDiagram?.outputs?.length > 0 && (
                <ul className="diagramBlock__ul diagramBlock__outputs">
                    {currentDiagram.outputs.map((output, index) => (
                        <>
                            <li id={`output-${index}-${currentDiagram?.id}`} className={`diagramBlock__ul-li diagramBlock__outputs-input diagramBlock__ul-li-${currentDiagram.id}`}></li>
                            <Xarrow
                                start={`diagramBlock-${currentDiagram?.id}`}
                                end={`output-${index}-${currentDiagram?.id}`}
                                color="#353535"
                                strokeWidth={1}
                                gridBreak="90%"
                                path="grid"
                                labels={{end: <span style={{
                                    fontSize: "10px",
                                    maxWidth: "80px",
                                    display: "block",
                                    transform: "translateX(105%)"
                            }}>{output}</span>}}
                            />
                        </>
                    ))}
                </ul>
            )}
            {currentDiagram?.controls?.length > 0 && (
                <ul className="diagramBlock__ul diagramBlock__controls">
                    {currentDiagram.controls.map((control, index) => (
                        <>
                            <li id={`control-${index}-${currentDiagram?.id}`} className={`diagramBlock__ul-li diagramBlock__controls-input diagramBlock__ul-li-${currentDiagram.id}`}>{control}</li>
                            <Xarrow
                                start={`control-${index}-${currentDiagram?.id}`}
                                end={`diagramBlock-${currentDiagram?.id}`}
                                color="#353535"
                                strokeWidth={1}
                                gridBreak="90%"
                                path="grid"
                            />
                        </>
                    ))}
                </ul>
            )}
            {currentDiagram?.mechanisms?.length > 0 && (
                <ul className="diagramBlock__ul diagramBlock__mechanims">
                    {currentDiagram?.mechanisms?.map((mechanim, index) => (
                        <>
                        <li id={`mechanim-${index}-${currentDiagram?.id}`} className={`diagramBlock__ul-li diagramBlock__mechanims-input diagramBlock__ul-li-${currentDiagram.id}`}>{mechanim}</li>
                        <Xarrow
                            start={`mechanim-${index}-${currentDiagram?.id}`}
                            end={`diagramBlock-${currentDiagram?.id}`}
                            color="#353535"
                            strokeWidth={1}
                            gridBreak="90%"
                            path="grid"
                        /></>
                    ))}
                </ul>
            )}
        </div>
    );
};
