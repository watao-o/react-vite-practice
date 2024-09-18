import { useEffect, useState } from 'react';
import axios from 'axios';



export default function InputForm2() {
  const [countries, setCountries] = useState([]);
  const [language, setLanguage] = useState('english');
  // const [urls, setUrls] = useState([]);
  // const [cookNames, setCookNames] = useState('鯖の塩焼き');

  // [language]が変更されるたびにAPIをたたく
  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/lang/${language}`)
      .then(res => {
        setCountries(res.data);
      }).catch(err => {
        console.log(err);
      });
  }, [language]);
  return (
    <>
      <div className="container">
        <div className="select-wrapper">
          <p>言語を選択</p>
        <select className="select" onChange={(e) => setLanguage(e.target.value)}>
          <option value="english">英語</option>
          <option value="chinese">中国語</option>
          <option value="hebrew">ヘブライ語</option>
        </select>
      </div>
      <div>
        {countries && countries.map((item, i) => (
            <div key={i}>{item.name.common}{item.flag}</div>
           ))}
      </div>
    </div>
    </>
  )
}

