import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResults from "./components/SearchResults/SearchResults";

export const BASE_URL = "http://localhost:9000";
const App = () => {

  const [data,setData]=useState(null);
  const [filterdData,setFilteredData]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const [selectedBtn,setSelectedBtn]=useState(null);


  useEffect(()=>{
    const fetchFoodData = async ()=>{

      setLoading(true);
  
      try {
  
        const response = await fetch(BASE_URL);
        const json =await response.json();
        
        setData(json);
        setLoading(false);
      } catch (error) {
        
        setError("Unable To Fetch Data From Server");
      }
      
   
    };
  
  
    fetchFoodData();
  },[]);
  

  const searchFood = (e) =>{
    const searchValue = e.target.value;

    console.log(searchValue);

    if(searchValue===""){
      setFilteredData(null);
    }

    const filter = data?.filter((food)=>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };


  const filterFood=(type)=>{

    

    if(type==="all"){
      setFilteredData(data);
      setSelectedBtn("all");
      return;

    }

    const filter = data?.filter((food)=>
      food.type.toLowerCase().includes(type.toLowerCase())
    );

    setFilteredData(filter);
    setSelectedBtn(type);


  }



  const filterBtn=[
    {
      name:"All",
      type:"all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];



  if(error) return <div>{error}</div>;
  if(loading) return <div>loading......</div>




  return (
  <>
  <MainContainer>

  <TopContainer>
    <div className="logo">
      <img src="./images/logo.svg" alt="logo" />
    </div>

    <div className="search">
    <input onChange={searchFood} placeholder="Search Food" />

    </div>
  </TopContainer>



  <FilterContainer>

  {
    filterBtn.map((value)=>(
      <Button isSelected={selectedBtn===value.type} key={value.name} onClick={()=>filterFood(value.type)}>{value.name}</Button>

    ))
  }


  </FilterContainer>
  </MainContainer>

  <SearchResults data={filterdData}/>
</>
  
  );
};



export const MainContainer = styled.div`
max-width: 1200px;
margin: 0 auto;
`;


const TopContainer = styled.section`
min-height: 140px;
display: flex;
justify-content: space-between;
padding: 16px;
align-items: center;


.search{
  input
  {
  background: transparent;
  border: 1px solid red;
  color: white;
  border-radius: 5px;
  height: 40px;
  font-size: 16px;
  padding: 0 4px;

  &::placeholder {
        color: white;
      }
  }

}

@media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }

`;


const FilterContainer = styled.section`

display: flex;
justify-content: center;
gap: 12px;
padding-bottom: 40px;



`;

export const Button = styled.button`
background: ${({ isSelected }) => (isSelected ? "#f22f2f" : "#ff4343")};
outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
border-radius: 5px;
padding: 6px 12px;
border: none;
color: white;
cursor: pointer;
&:hover{
  background-color: #f22f2f;
}
`;


export default App;
