import { NetworkTables, NetworkTablesTypeInfos } from "ntcore-ts-client"
import { useState } from "react";
import MotorCard from "./MotorCard"

interface SubsystemMotorProps {
    NTSubsystemKey: String,
    NTClient: NetworkTables
}

export default function SubsystemMotors(props: SubsystemMotorProps) {
    const motorNamesTopic = props.NTClient.createTopic(`/AdvantageKit/RealOutputs/MotorChecker/${props.NTSubsystemKey}/motorNames`, NetworkTablesTypeInfos.kStringArray);
    const [motorNames, setMotorNames] = useState<String[]>([])

    motorNamesTopic.subscribe((value) => {
        if (value != null && motorNames.toString() != value.toString()){
            setMotorNames(value as String[]);
        }
    }, true);

    return (
        <div className="rounded-lg bg-black h-58 mr-10 p-4">
            <h1 className="text-white mb-4 text-xl font-semibold">{props.NTSubsystemKey}</h1>
            <div className="flex flex-row gap-4 overflow-x-scroll flex-wrap">
                {(motorNames.length > 0) && motorNames.map((name: String) => (
                    <MotorCard NTMotorKey={name} NTSubsystemKey={props.NTSubsystemKey} NTClient={props.NTClient}/>
                ))}
            </div>
        </div>
    )
}