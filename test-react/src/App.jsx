import { useForm } from 'react-hook-form';
import React from 'react';
import axios from 'axios';
import './App.css';

const cities = "https://run.mocky.io/v3/9fcb58ca-d3dd-424b-873b-dd3c76f000f4"

function App() {
  const { register,
    formState: { errors, isValid }, handleSubmit, reset } = useForm({ mode: "onBlur" })
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    reset();
  }

  const [city, setCity] = React.useState(null)
  React.useEffect(() => {
    axios.get(cities).then((response) => {
      setCity(response.data);
    });
  }, []);

  return <main className='app'>
    <h1>Test Form</h1>
    <form onSubmit={handleSubmit(onSubmit)}>

      <label >
        Name:
        <input type="text"
          {...register("firstName", {
            required: "Необхідно заповнити це поле"
          })}
        />
      </label>
      <div style={{ height: 30 }}>
        {errors?.firstName && <p>{errors?.firstName?.message || "От лишенько, щось пішло не так"} </p>}
      </div>

      <label >
        Birthday Date:
        <input type="date"
          {...register("birthDate", {
            required: "Необхідно заповнити це поле",
            valueAsDate: true,
          })}
        />
      </label>
      <div style={{ height: 30 }}>
        {errors?.birthDate && <p>{errors?.birthDate?.message || "От лишенько, щось пішло не так"} </p>}
      </div>

      <label >
        Sex:
        <select {...register("sex", {
          required: "Необхідно заповнити це поле"
        })}>
          <option value="">--Вкажіть свою стать--</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <div style={{ height: 30 }}>
        {errors?.sex && <p>{errors?.sex?.message || "От лишенько, щось пішло не так"} </p>}
      </div>

      <label >
        City:
        <select {...register("cityName", {
          required: "Необхідно заповнити це поле"
        })}>
          <option value="">--Вкажіть своє місто--</option>
          
            
         
        </select>
      </label>
      <div style={{ height: 30 }}>
        {errors?.cityName && <p>{errors?.cityName?.message || "От лишенько, щось пішло не так"} </p>}
      </div>

      <input type="submit" disabled={!isValid} />
    </form>
  </main>
}

export default App
