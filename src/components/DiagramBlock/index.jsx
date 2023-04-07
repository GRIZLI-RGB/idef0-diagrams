import "./DiagramBlock.scss";

export const DiagramBlock = ({ currentDiagram, styles }) => {
    return (
        <div className="diagramBlock" id={`diagramBlock-${currentDiagram.id}`} style={styles}>
            <h6 className="diagramBlock__name">{currentDiagram.name}</h6>
            <p className="diagramBlock__id">{currentDiagram.id}</p>
            {currentDiagram.inputs.length > 0 && (
                <ul className="diagramBlock__ul diagramBlock__inputs">
                    {currentDiagram.inputs.map(input => (
                        <li className={`diagramBlock__ul-li diagramBlock__inputs-input diagramBlock__ul-li-${currentDiagram.id}`}>{input}</li>
                    ))}
                </ul>
            )}
            {currentDiagram.outputs.length > 0 && (
                <ul className="diagramBlock__ul diagramBlock__outputs">
                    {currentDiagram.outputs.map(output => (
                        <li className={`diagramBlock__ul-li diagramBlock__outputs-input diagramBlock__ul-li-${currentDiagram.id}`}>{output}</li>
                    ))}
                </ul>
            )}
            {currentDiagram.controls.length > 0 && (
                <ul className="diagramBlock__ul diagramBlock__controls">
                    {currentDiagram.controls.map(control => (
                        <li className={`diagramBlock__ul-li diagramBlock__controls-input diagramBlock__ul-li-${currentDiagram.id}`}>{control}</li>
                    ))}
                </ul>
            )}
            {currentDiagram.mechanisms.length > 0 && (
                <ul className="diagramBlock__ul diagramBlock__mechanims">
                    {currentDiagram.mechanisms.map(mechanim => (
                        <li className={`diagramBlock__ul-li diagramBlock__mechanims-input diagramBlock__ul-li-${currentDiagram.id}`}>{mechanim}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};
