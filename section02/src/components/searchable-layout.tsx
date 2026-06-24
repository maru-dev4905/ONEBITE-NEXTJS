import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from './searchable-layout.module.css';

export default function SeachableLayout(
  {
    children
  }: 
  {
    children:ReactNode
  }
){

  const router = useRouter();

  const q = router.query.q as string;

  useEffect(()=>{
    setSearch(q || "");
  }, [q]);

  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSubmit = () => {
    if(!search || q === search) return;
    router.push(`/search?q=${search}`);
  }
  
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter"){
      onSubmit();
    }
  }

  return (
    <div>
      <div className={style.searchbar_container}>
        <input value={search} type="text" placeholder="검색어를 입력해주세요..." 
          onChange={onChangeSearch} 
          onKeyDown={onKeyDown}/>
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}