import React, { useState } from "react";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  type: string;
}

const FormRegistration = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "",
  });
  const [dataSelect, setDataSelect] = useState<string>('');
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDataSelect(e.target.value);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("password do not match");
      return;
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label> FullName:</label>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded-2xl mb-2 "
      />
      <label className="block mb-2">Phone Number:</label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded-2xl mb-3"
      />

      <label className="block mb-2">Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded-2xl mb-3 outline-0"
      />

      <label className="block mb-2">Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded-2xl mb-3"
      />

      <label className="block mb-2">Confirm Password:</label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded-2xl mb-3"
      />
      <label className="block mb-2">type: </label>
      <select className="w-full p-2 border rounded-2xl mb-3" onChange={handleSelectChange} value={dataSelect}>
        <option value="student">student</option>
        <option value="company">company</option>
        
        
      </select>
     
      <button
        type="submit"
        className="w-full bg-primary text-white p-2 rounded-2xl hover:bg-green-400 cursor-pointer">
        Continue
      </button>
    </form>
  
    
  );
};
export default FormRegistration;
