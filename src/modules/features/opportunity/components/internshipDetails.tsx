 const InternshipDetails = () => {
   return (
     <div className="space-y-4 mx-auto p-6 shadow bg-white rounded-lg">
       <h2 className="font-semibold text-lg">Details</h2>
       <p className="text-muted-foreground">
         Huawei is hiring for the Internship Program!
       </p>

       <div className="space-y-2">
         <h3 className="font-medium">Sales & Project Details:</h3>
         <ul className="list-disc list-inside space-y-1 text-muted-foreground">
           <li>
             Background: This internship provides a hands-on learning
             opportunity in the ICT sector focusing on key technical areas
           </li>
           <li>
             Opportunity to network opportunities, data analysis, and
             innovative solutions across different core technology domains
           </li>
         </ul>
       </div>

       <div className="space-y-2" >
         <h3 className="font-medium">Requirements:</h3>
         <ul className="list-disc list-inside space-y-1 text-muted-foreground">
           <li>
             Open to 3rd year students or recent graduates in IT,
             Telecommunications, or related fields
           </li>
           <li>Strong analytical skills and proficiency in IT tools</li>
           <li>
             Student communication skills and openness for technology
           </li>
         </ul>
       </div>
     </div>
   );
 };

 export default InternshipDetails;
