'use client'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store";
import AnalyticsIcon from '@mui/icons-material/Analytics';

export default function conclude(){
   
    const ScoreState = useSelector((state: RootState) => state.scoreState);
    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-purple-100">
            <div className="bg-white rounded-2xl shadow-xl px-10 py-8 max-w-md w-full text-gray-700 space-y-6">
                <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">🎉 Conclude</h1>
                <div className="space-y-4 text-lg">
                    <p>
                        <span className="font-semibold">Score:</span>{" "}
                        <span className="text-blue-700">
                            {ScoreState.ScoreItem.score} / {ScoreState.ScoreItem.total}
                        </span>
                    </p>
                    <p>
                        <span className="font-semibold">Subject:</span>{" "}
                        {ScoreState.ScoreItem.subject}
                    </p>
                    <p>
                        <span className="font-semibold">Type:</span>{" "}
                        {ScoreState.ScoreItem.type}
                    </p>
                    <p>
                    <span className="font-semibold">Created At:</span>{" "}
                        {new Date(ScoreState.ScoreItem.createdAt).toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </p>
                </div>
                
                <h1 className="text-3xl font-bold text-center text-black mb-6"> <AnalyticsIcon className="text-red-600" /> analyse</h1>
                
                <div className="space-y-4 text-lg">
                    <p>
                        <span className="font-semibold">AVG Score:</span>{" "}
                        <span className="text-blue-700">
                            yor avg
                        </span>
                    </p>
                    <p>
                        <span className="font-semibold">performance:</span>{" "}
                        <span className="text-blue-700">
                            not good
                        </span>
                    </p>
                   
                    <div className="flex space-x-6 font-semibold text-gray-700">
                        <span>
                            easy: <span className="text-green-500">fdfd</span>
                        </span>{" "}
                        <span>
                            medium: <span className="text-yellow-500">fdfd</span>
                        </span>
                        <span>
                            hard: <span className="text-red-500">fdfd</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}