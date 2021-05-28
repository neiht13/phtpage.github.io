import {lazy, useEffect, useState} from "react";
import axios from "axios";
import * as CSS from "./styles";
import removeVietnamese from "../../common/Utilities/ConvertViString";
import useForm from "../../common/Form/useForm";
import TableX from "../../common/Table";
import * as instanceApi from "../../service/service"

const Block = lazy(() => import("../../components/Block"));
const Input = lazy(() => import("../../common/Input"));
const Button = lazy(() => import("../../common/Button"));
const TextArea = lazy(() => import("../../common/TextArea"));

const Message = ({ title, content, id, t }) => {
  const { values, setValues, errors, handleChange, handleSubmit, shouldSubmit, setShouldSubmit, setUrlForm } = useForm();
  const [messages, setMessages] = useState(null);
  const [resolvedAction, setResolvedAction] = useState(false);
  useEffect(() =>{
    fetchData();
  },[resolvedAction])

  const fetchData = () => {
    axios.get('http://localhost:5000/messages').then(res =>{
      setMessages(res.data)
    })
  }

  const solveAction = (row) => {
    instanceApi.update('messages', {
      id: row.target.id
    }).then(res => {
      setResolvedAction(resolvedAction => !resolvedAction);
    })
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      render: (id, i) => {
        if(i.resolved === 0){
          return <i
              className={`fas fa-check`}
              style={{color: 'tomato', cursor: 'pointer'}}
              id={id} onClick={solveAction}/>
        } else {
          return <i
              className={`fas fa-check-circle`}/>
        }
      },
    },
  ];

  return (
      <div>
          <TableX dataSource={messages} columns={columns} />
      </div>
  );
};

export default Message;
