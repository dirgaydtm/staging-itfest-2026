interface SubmissionMessageProps {
  leaderName: string;
}

const SubmissionMessage = ({ leaderName }: SubmissionMessageProps) => {
  return (
    <div className="bg-blue-500 border-2 border-purple-300 p-4 rounded-4xl text-sm">
      <p><strong>Message!</strong></p>
      <p>yaa gitulahh</p>
      <p>Nanti yaa bang {leaderName || "our team"} </p>
    </div>
  );
};

export default SubmissionMessage;
