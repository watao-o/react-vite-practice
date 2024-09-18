import { useForm } from 'react-hook-form';

export default function InputForm() {
  let counter = 0;
  const {register, handleSubmit} = useForm();
  const onSubmit = (d:any) => {
    console.log('onSubmit呼び出し');
    alert(JSON.stringify(d))};

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          料理名：
          <input {...register('name', {
            required: true
          })} />
        </label>
        <label>
          URL：
          <input {...register('url', {
            required: true
          })} />
        </label>
        <label>
          難易度：
          <input {...register('diffuiculty', {
            required: true
          })} />
        </label>

        <p>Render：<span>{counter++}</span></p>
        <input type='submit' value='submit' />
      </form>
    </>
  )
}

