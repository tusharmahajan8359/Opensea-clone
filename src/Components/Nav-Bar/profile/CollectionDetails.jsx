import React from 'react'
import {useSelector} from 'react-redux'
import MyNftCard from "../../Card/MyNftCard"
const CollectionDetails = () => {
const collectionData=useSelector((state)=>state.dataReducer.data)

  return (
    <div className="container">
     <div className=" text-center">
       <h1>Collection Details</h1>
       <div className="m-5 ">
       <img   src={collectionData.image} alt={collectionData.name} style={{height:"350px"}}/>
       </div>
      
       <h3>name :{collectionData.name}</h3>
       <h4> Owner : {collectionData.creator}</h4>
       <h4>Description : {collectionData.description}</h4>
     </div>
     {console.log("collectionData ",collectionData)}
     <hr/>
     <h3 className="text-center">My NFT's</h3>

     <div className="row row-cols-md-3 gy-3 p-0 m-5">
       
                 <MyNftCard />
                 <MyNftCard />
                 <MyNftCard />
      
     </div>
    </div>
   
  )
}

export default CollectionDetails