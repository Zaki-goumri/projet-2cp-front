const InternshipDetails = () => {
  return (
    <div className="mx-auto space-y-4 rounded-lg bg-white p-6 shadow">
      <h2 className="text-xl font-semibold border-b pb-3">Details & Description</h2>
      <p className="text-muted-foreground text-base">
        Huawei is hiring for the Internship Program!
      </p>

      <div className="space-y-3">
        <h3 className="font-medium text-lg">Sales & Project Details:</h3>
        <ul className="text-muted-foreground list-inside list-disc space-y-2 pl-2">
          <li className="flex items-start">
            <span className="mt-0.5 mr-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-500"></span>
            <span>Background: This internship provides a hands-on learning opportunity
            in the ICT sector focusing on key technical areas</span>
          </li>
          <li className="flex items-start">
            <span className="mt-0.5 mr-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-500"></span>
            <span>Opportunity to network opportunities, data analysis, and innovative
            solutions across different core technology domains</span>
          </li>
        </ul>
      </div>

      <div className="space-y-3 mt-6">
        <h3 className="font-medium text-lg">Requirements:</h3>
        <ul className="text-muted-foreground list-inside list-disc space-y-2 pl-2">
          <li className="flex items-start">
            <span className="mt-0.5 mr-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-500"></span>
            <span>Open to 3rd year students or recent graduates in IT,
            Telecommunications, or related fields</span>
          </li>
          <li className="flex items-start">
            <span className="mt-0.5 mr-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-500"></span>
            <span>Strong analytical skills and proficiency in IT tools</span>
          </li>
          <li className="flex items-start">
            <span className="mt-0.5 mr-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-500"></span>
            <span>Student communication skills and openness for technology</span>
          </li>
        </ul>
      </div>

      <div className="space-y-3 mt-6">
        <h3 className="font-medium text-lg">Benefits:</h3>
        <ul className="text-muted-foreground list-inside list-disc space-y-2 pl-2">
          <li className="flex items-start">
            <span className="mt-0.5 mr-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-500"></span>
            <span>Hands-on experience with cutting-edge technologies</span>
          </li>
          <li className="flex items-start">
            <span className="mt-0.5 mr-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-500"></span>
            <span>Networking opportunities with industry professionals</span>
          </li>
          <li className="flex items-start">
            <span className="mt-0.5 mr-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-500"></span>
            <span>Certificate upon successful completion</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InternshipDetails;
