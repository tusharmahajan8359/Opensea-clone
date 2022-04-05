const collectionData={};

const dataReducer=(state=collectionData,action)=>{

    switch(action.type){
        case "CollectionData": 
            return {
                      data: action.payload
            }
         default:return state;   
    }
}

export default dataReducer;