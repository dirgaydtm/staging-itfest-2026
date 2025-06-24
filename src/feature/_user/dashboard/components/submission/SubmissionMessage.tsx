interface SubmissionMessageProps {
  leaderName: string;
}

const SubmissionMessage = ({ leaderName }: SubmissionMessageProps) => {
  return (
    <div className="bg-blue-500 border-2 border-purple-300 p-8 rounded-4xl text-sm font-changa">
      <h2 className="font-bold text-2xl">Message:</h2>
      <div className="mt-4">
        <p>yaa gitulahh</p>
        <p>Nanti yaa bang {leaderName || "our team"} </p>
      </div>
    </div>
  );
};

export default SubmissionMessage;
