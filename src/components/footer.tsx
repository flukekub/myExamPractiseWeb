export default function Footer() {
    return(
        <footer className="bg-gray-900 text-white py-6 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} ExamSphere. All rights reserved.</p>
        </footer>
    );
}