import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";

function Job() {
    const [project, setProject] = useState({});
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
      const fetchData = async () => {
          try {
              const res = await axios.get(`http://localhost:3001/Server/job/${id}`);
              setProject(res.data);
          } catch (err) {
              console.log(err);
          }
      }; 
      fetchData();
  }, [id]);

    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProject({ ...project, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`/Server/job/ungtuyen/${id}`, project);
            alert("Bạn Đã Ứng Tuyển Thành Công <3")
            navigate("/findjob");
        } catch (error) {
            console.error("Không thể cập nhật dự án", error);
        }
    };

    if (!project) {
        return <div className="editjob">Đang tải dự án...</div>;
    }

    return (
        <div className="job">
            <form>
                <label>
                    Tên dự án:
                    <input type="text" name="ten_du_an" value={project.ten_du_an} onChange={handleInputChange} />
                </label>
                <label>
                    Mô tả dự án:
                    <input type="text" name="mo_ta_du_an" value={project.mo_ta_du_an} onChange={handleInputChange} />
                </label>
                <label>
                    Ngành Nghề:
                    <input type="text" name="nganh_nghe" value={project.nganh_nghe} onChange={handleInputChange} />
                </label>
                <label>
                    Số lượng lao động:
                    <input type="number" name="so_luong" value={project.so_luong} onChange={handleInputChange} />
                </label>
                <label>
                    Kỹ năng cần thiết:
                    <input type="text" name="ky_nang_can_thiet" value={project.ky_nang_can_thiet} onChange={handleInputChange} />
                </label>
                <label>
                    Mức Lương:
                    <input type="number" name="muc_luong" value={project.muc_luong} onChange={handleInputChange} />
                </label>
                <label>
                    Thời hạn dự án:
                    <input type="date" name="thoi_han_du_an" value={project.thoi_han_du_an ? moment(project.thoi_han_du_an, 'MM/DD/YYYY').format('YYYY-MM-DD') : ''} onChange={handleInputChange} />
                </label>
                <label>
                    Hạn chót nộp hồ sơ:
                    <input type="date" name="han_chot_nop_ho_so" value={project.han_chot_nop_ho_so ? moment(project.han_chot_nop_ho_so, 'MM/DD/YYYY').format('YYYY-MM-DD') : ''} onChange={handleInputChange} />
                </label>
                <button onClick={handleSubmit} type="submit">ỨNG TUYỂN</button>
            </form>
        </div>
    );
}

export default Job;
