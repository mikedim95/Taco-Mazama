import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useMyContext } from "../context/UseMyContext";
import LoginPage from "../pages/LoginPage";

const Table = () => {
  const { setTableNo } = useMyContext();
  const { tableNo } = useParams();

  useEffect(() => {
    setTableNo(tableNo);
  }, [tableNo, setTableNo]);

  return <LoginPage />;
};

export default Table;
