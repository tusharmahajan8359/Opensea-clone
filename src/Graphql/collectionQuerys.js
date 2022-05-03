import { gql } from "@apollo/client";

export const GET_All_Collections = gql`
  query {
    collections {
      id
      name
      collectionId
      creator
      collectionLink
    }
  }
`;

export const GET_Collection = (id) => {
  return gql` query {
                       collections (where:{collectionId: ${id}){
                             id
                             name
                             collectionId
                             creator
                             collectionLink
                       }
                    } `;
};
