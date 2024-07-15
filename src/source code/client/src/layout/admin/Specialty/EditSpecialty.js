import React, { useState, useEffect, useCallback } from 'react';
import { getSpecialtyById, updateSpecialty } from '../../../api/specialtiesApi';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Specialty.css';

const EditSpecialty = ({ setCurrentView, editId, touristSpotId }) => {
  const [specialty, setSpecialty] = useState({
    name: '',
    price: '',
    description: '',
    origin: '',
    expired: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [CKEditorContent, setCKEditorContent] = useState('');

  const fetchSpecialty = useCallback(async () => {
    try {
      const data = await getSpecialtyById(editId);
      setSpecialty(data);
      setImagePreview(data.image); // Hiển thị ảnh hiện tại
      setCKEditorContent(data.description);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin đặc sản:', error);
    }
  }, [editId]);

  useEffect(() => {
    if (touristSpotId && editId) {
      fetchSpecialty();
    }
  }, [fetchSpecialty, touristSpotId, editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpecialty({ ...specialty, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setSpecialty({
          ...specialty,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setSpecialty({
        ...specialty,
        image: ''
      });
    }
  };

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setCKEditorContent(data);
    setSpecialty({
      ...specialty,
      description: data
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSpecialty(touristSpotId, editId, specialty);
      alert('Đã cập nhật đặc sản thành công');
      setCurrentView('list-specialty');
    } catch (error) {
      console.error('Lỗi khi cập nhật đặc sản:', error);
      alert('Có lỗi xảy ra khi cập nhật đặc sản');
    }
  };

  // Hàm upload adapter
  const CustomUploadAdapter = (loader) => {
    return {
      upload: () => {
        return loader.file
          .then(file => new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('image', file);

            fetch('http://localhost:5000/api/image/upload', { // Đường dẫn đến API upload
              method: 'POST',
              body: formData
            })
              .then(response => response.json())
              .then(result => {
                resolve({
                  default: result.imageUrl
                });
              })
              .catch(error => {
                reject(error);
              });
          }));
      }
    };
  };

  // Hàm thêm adapter cho editor
  function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return CustomUploadAdapter(loader);
    };
  }

  return (
    <div className="body-content">
      <form onSubmit={handleSubmit}>
        <div className="decoration blur-2"></div>
        <div className="decoration blur-3"></div>
        <div className="container-xxl">
          <div className="card mb-4">
            <div className="card-header position-relative">
              <h6 className="fs-17 fw-semi-bold mb-0">Chỉnh sửa Đặc Sản</h6>
            </div>
            <div className="card-body">
              <div className="row g-4">
                <div className="col-sm-6">
                  <div className="">
                    <label className="required fw-medium mb-2">Tên Đặc Sản</label>
                    <input type="text" className="form-control" name="name" value={specialty.name} placeholder="Tên" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="">
                    <label className="required fw-medium mb-2">Giá</label>
                    <input type="text" className="form-control" name="price" value={specialty.price} placeholder="Giá" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="">
                    <label className="required fw-medium mb-2">Mô Tả</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={CKEditorContent}
                      onChange={handleDescriptionChange}
                      config={{
                        extraPlugins: [MyCustomUploadAdapterPlugin],
                        simpleUpload: {
                          uploadUrl: 'http://localhost:5000/api/image/upload',
                          headers: { }
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="">
                    <label className="required fw-medium mb-2">Xuất xứ</label>
                    <input type="text" className="form-control" name="origin" value={specialty.origin} placeholder="Xuất xứ" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="">
                    <label className="required fw-medium mb-2">Hạn sử dụng</label>
                    <input type="text" className="form-control" name="expired" value={specialty.expired} placeholder="Hạn sử dụng" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-sm-12">
                  <label className="required fw-medium mb-2">Hình Ảnh</label>
                  <div className="d-flex justify-content-between alight-item-center">   
                    <input  type="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && <img className="image-all" src={imagePreview} alt="Preview" />}
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary-soft"><i className="fa fa-save me-2"></i>Lưu Thay Đổi</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditSpecialty;
