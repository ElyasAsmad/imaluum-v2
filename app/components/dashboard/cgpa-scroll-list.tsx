import useResult from "~/hooks/use-result";

const CGPAScrollList = () => {
	const { result } = useResult();
	return result === null ? (
		<div className="w-full h-full flex items-center justify-center">
			<h1 className="text-white font-bold text-center text-xs sm:text-lg">
				You have not taken any exams yet!
			</h1>
		</div>
	) : (
		<>
			{result?.map((result, index) => {
				return (
					<div key={index} className="flex flex-col text-xs md:text-sm">
						<p>
							<span className="font-bold text-zinc-900 dark:text-slate-100">
								Session:{" "}
							</span>
							{result.session_name}
						</p>
						<p>
							<span className="font-bold text-zinc-900 dark:text-slate-100">
								GPA:{" "}
							</span>
							{result.gpa_value}
						</p>
						<p>
							<span className="font-bold text-zinc-900 dark:text-slate-100">
								CGPA:{" "}
							</span>
							{result.cgpa_value}
						</p>
					</div>
				);
			})}
		</>
	);
};

export default CGPAScrollList;
