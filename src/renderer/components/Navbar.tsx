import { useContext } from "react";
import logo from "renderer/assets/logo.png";
import { MotorContext } from "renderer/pages/Motors";

export default function Navbar() {
    const [motorSummary, setMotorSummary] = useContext(MotorContext);
    console.log(motorSummary)
    
    return (
        <div className="text-3xl font-semibold text-white pt-6 pl-6 w-[350px] min-h-screen bg-black">
            <div className="mb-20">
                <img src={logo} className="inline w-12"></img>
                <h1 className="pt-2 inline ml-2">FalconSpin</h1>
            </div>
            <div className="ml-2 mb-10">
                <h1 className="text-2xl font-semibold mb-2">📊 STATUS</h1>
                <h2 className="text-lg font-normal">Motors</h2>
            </div>
            <div className="ml-2 mb-10">
                <h1 className="text-2xl font-semibold mb-4">⚡ Quick Status</h1>
                <div className="flex flex-row w-48">
                    <div className="basis-1/2">
                        {(motorSummary) && Object.keys(motorSummary).slice(0, Math.ceil(Object.keys(motorSummary).length / 2)).map((id: String) => (
                            <h2 className="text-lg font-normal rounded-2xl bg-green-500 w-20 text-center mb-2">ID <span className="font-semibold">{id}</span></h2>
                        ))}
                    </div>
                    <div className="basis-1/2">
                        {(motorSummary) && Object.keys(motorSummary).slice( Math.ceil(Object.keys(motorSummary).length / 2)).map((id: String) => (
                            <h2 className="text-lg font-normal rounded-2xl bg-green-500 w-20 text-center mb-2">ID <span className="font-semibold">{id}</span></h2>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}