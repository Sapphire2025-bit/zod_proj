"use client"
import {z} from 'zod';

const userSchema = z.object({
  id: z.string().min(9, "id - string must contain at least 9 characters"),
  first_name: z.string().min(2, "first name - string must contain at least 2 characters"),
  last_name: z.string().min(2, "last name - string must contain at least 2 characters"),
  date: z.date().max(new Date(),"Date of birth must be in the past"),
  email: z.string().email("invalid email"),
});

const validate = (userData) => {
  try{
    const validUserData = userSchema.parse(userData);
    console.log("inputs are valid");
  }
  catch (error){
    if(error instanceof z.ZodError){
      console.error("validation error: ", error.errors);
    }
  }
};

export default function Home() {
  const inpStyle = "m-2 border-gray-300 border-2 rounded";

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const birthDateString = formData.get("date");
    const birthDate = birthDateString ? new Date(birthDateString) : null;

    const dataToValidate = {
      id: formData.get("id"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      date: birthDate,
      email: formData.get("email"),
    };
    validate(dataToValidate);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="m-6">
          פרטים אישיים
          <input type="text" name="id" placeholder="תעודת זהות" className={inpStyle}/>
          <input type="text" name="first_name" placeholder="שם פרטי" className={inpStyle}/>
          <input type="text" name="last_name" placeholder="שם משפחה" className={inpStyle}/>
          <input type="date" name="date" className={inpStyle}/>
        </label>
        <br/>
        <label className="m-6">
          פרטי התקשרות
          <input type="email" name="email" placeholder='דוא"ל' className={inpStyle}/>
        </label>
        <br/>
        <button type="submit" className="m-8 bg-blue-500 text-white px-4 py-2 rounded">שמור</button>
      </form>
    </div>
  )
}
