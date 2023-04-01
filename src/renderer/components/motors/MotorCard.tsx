import { NetworkTables, NetworkTablesTypeInfos } from "ntcore-ts-client";
import { useContext, useState } from "react";
import { MotorContext } from "renderer/pages/Motors";

interface MotorProps {
    NTMotorKey: String,
    NTSubsystemKey: String,
    NTClient: NetworkTables
}

export default function MotorCard(props: MotorProps) {
    const [motorSummary, setMotorSummary] = useContext(MotorContext);
    console.log(motorSummary)

    var id = Math.random().toString(36).substr(2, 9)

    const idTopic = props.NTClient.createTopic(`/AdvantageKit/RealOutputs/MotorChecker/${props.NTSubsystemKey}/${props.NTMotorKey}/MotorID`, NetworkTablesTypeInfos.kInteger);
    const [motorID, setMotorID] = useState<String>("NaN")

    var newSummary = motorSummary
    newSummary[id] = [motorID, false]
    setMotorSummary(newSummary)

    idTopic.subscribe((value) => {
        if (motorID != value && value != null){
            setMotorID(value as String);
            var newSummary = motorSummary
            newSummary[id][0] = value as String
            setMotorSummary(newSummary)
        }
    }, true);

    const errorTopic = props.NTClient.createTopic(`/AdvantageKit/RealOutputs/MotorChecker/${props.NTSubsystemKey}/${props.NTMotorKey}/Errors`, NetworkTablesTypeInfos.kStringArray);
    const [errorList, setErrorList] = useState<String[]>(["motor has failed test1", "motor has failed test2"])

    errorTopic.subscribe((value) => {
        if (value != null && errorList.toString != value.toString){
            setErrorList(value as String[]);
            // fix this
            var newSummary = motorSummary
            newSummary[id][1] = true
            setMotorSummary(newSummary)
        }
    }, true);

    return (
        <>
        {(errorList.length > 1) && 
            <div className="text-white w-72 h-40 rounded-lg border-2  border-[#c21919] bg-[#170f0f] p-4">
                <h1 className="text-lg font-semibold">{props.NTMotorKey} <span className="ml-2 rounded-md border-[#ffffff] border-2 px-1">{motorID}</span></h1>
                <div className="text-md mt-2">
                    {(errorList.length > 0) && errorList.map((error: String) => (
                        <h1 className="text-md font-normal">{error}</h1>
                    ))}
                </div>
            </div>
        }
        {(errorList.length <= 1) && 
            <div className="text-white w-72 h-40 rounded-lg border-2  border-[#30363D] bg-[#0f1317] p-4">
                <h1 className="text-lg font-semibold">{props.NTMotorKey} <span className="ml-2 rounded-md border-[#ffffff] border-2 px-1">{motorID}</span></h1>
                <div className="text-md mt-2">
                    {(errorList.length > 0) && errorList.map((error: String) => (
                        <h1 className="text-md font-normal">{error}</h1>
                    ))}
                </div>
            </div>
        }
        </>
        
    )
}