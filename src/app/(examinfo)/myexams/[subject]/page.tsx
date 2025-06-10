
import { FaCalculator, FaProjectDiagram, FaInfinity, FaVectorSquare, FaChartBar, FaRegDotCircle } from 'react-icons/fa';
import { MdFunctions, MdOutlineTimeline, MdOutlineScience } from 'react-icons/md';
import { SiMatrix, SiDatabricks } from 'react-icons/si';
import { TbSum, TbMathPi } from 'react-icons/tb';
import { BsDiagram3, BsBarChart } from 'react-icons/bs';
import { GiPerspectiveDiceSixFacesRandom, GiConvergenceTarget } from 'react-icons/gi';
import Link from 'next/link';


const topics = [
  { name: "Set", type:"set", icon: <FaProjectDiagram size={28} /> },
  { name: "Logic", type:"logic", icon: <FaRegDotCircle size={28} /> },
  { name: "Real Numbers", type:"realNumber", icon: <TbMathPi size={28} /> },
  { name: "Relations and Functions", type:"relationAndFunction", icon: <MdFunctions size={28} /> },
  { name: "Exponential and Logarithms", type:"exponentialAndLogarithms", icon: <FaInfinity size={28} /> },
  { name: "Trigonometry", type:"trigon", icon: <TbSum size={28} /> },
  { name: "Complex Numbers", type:"complexNumber", icon: <MdOutlineTimeline size={28} /> },
  { name: "Matrices", type:"matrices", icon: <SiMatrix size={28} /> },
  { name: "Sequences and Series", type:"sequenceAndSeries", icon: <MdOutlineTimeline size={28} /> },
  { name: "Analytic Geometry and Conic Sections", type:"AnalyticGeometryAndConicSections", icon: <BsDiagram3 size={28} /> },
  { name: "Vectors", type:"vector", icon: <FaVectorSquare size={28} /> },
  { name: "Calculus", type:"calculus", icon: <MdOutlineScience size={28} /> },
  { name: "Statistics", type:"statistic", icon: <FaChartBar size={28} /> },
  { name: "Basic Counting Principles", type:"counting", icon: <FaCalculator size={28} /> },
  { name: "Probability", type:"probability", icon: <GiPerspectiveDiceSixFacesRandom size={28} /> },
  { name: "Introduction to Probability Distributions", type:"probabilityDistributions", icon: <GiConvergenceTarget size={28} /> },
];

export default function MathTopics({params}: {params: {subject: string}}) {
  return (
    <main className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          {params.subject} Topics
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" >
          {topics.map((topic, index) => (
            <Link href={'math/' + topic.type + '/choosemode'} key={index}>
              <div
                key={index}
                className="bg-blue-100 hover:bg-blue-200 text-blue-900 p-6 rounded-xl shadow-sm transition cursor-pointer flex items-center gap-4"
              >
                <div className="text-blue-700">
                  {topic.icon}
                </div>
                <h2 className="text-lg font-semibold">{topic.name}</h2>
              </div>
            </Link> 
          ))}
          
        </div>
        
      </div>
    </main>
  );
}
