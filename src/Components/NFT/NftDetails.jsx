import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./ViewNFT.css";
import {
  BsFillTagsFill,
  BsThreeDotsVertical,
  BsShareFill,
} from "react-icons/bs";
import { FaEthereum, FaWallet } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { ethers } from "ethers";
import Collection from "../../artifacts/contracts/CoreCollection.sol/CoreCollection.json";
import Market from "../../artifacts/contracts/Market.sol/Market.json";
import SellModal from "../modal/SellModal";
import LowerPriceModal from "../modal/LowerPriceModal";
import SendNftModal from "../modal/SendNftModal";
import NFTOffer from "./NFTOffer";
import Offers from "./Offers";
import NFTListing from "./NFTListing";
import NFTDescription from "./NFTDescription";
import NFTOfferModal from "../modal/NFTOfferModal";
import { AppContext } from "../../App";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

const NftDetails = () => {
  return <div>NftDetails</div>;
};

export default NftDetails;
