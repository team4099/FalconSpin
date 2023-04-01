import SubsystemMotors from "renderer/components/motors/SubsystemMotors"
import Navbar from "renderer/components/Navbar"

import { NetworkTables, NetworkTablesTypeInfos, NetworkTableTypeInfos } from 'ntcore-ts-client';
import { createContext, useState } from "react";

export const MotorContext = createContext<any>([]);

export default function Motors() {
    var ntcore = NetworkTables.getInstanceByURI("10.40.99.2", 5810)

    
    const [motorSummary, setMotorSummary] = useState<any>({2: "Yes"})

    const value = [motorSummary, setMotorSummary]

    const [renderElem, setRenderElem] = useState(false)
    const [subsystemNames, setSubsystemNames] = useState<String[]>([])
    setInterval(() => {
		if (ntcore.isRobotConnected()){
			const motorCheckerTopic = ntcore.createTopic('/AdvantageKit/RealOutputs/MotorChecker/subsystemNames', NetworkTablesTypeInfos.kStringArray);

			motorCheckerTopic.subscribe((value) => {
                if (value != null){
                    setSubsystemNames(value as String[])
                }
            }, true);
		}
        else {
            setMotorSummary({})
        }
        setRenderElem(ntcore.isRobotConnected())
	}, 500)
    
    return (
        <div className="w-full min-h-screen flex flex-row">
            <MotorContext.Provider value={value}>
                <Navbar/>
                <div className="w-full bg-[#0f1317] pt-8 pl-12">
                    <h1 className="text-3xl font-semibold text-white mb-10">Motors</h1>
                    { (renderElem) &&
                        <div className="flex flex-col gap-4">
                            {subsystemNames.map((name: String) => (
                                <SubsystemMotors NTSubsystemKey={name} NTClient={ntcore}/>
                            ))}
                        </div>
                    }
                </div>
            </MotorContext.Provider>
        </div>
    )
}