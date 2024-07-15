import React, { useEffect, useState } from 'react';
import { getTouristSpotById, updateTouristSpot } from '../../../api/touristSpotsApi';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './TouristSpot.css';

const EditTouristSpot = ({ setCurrentView, editId }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    image: '',
    category: '',
    google_map: '',
    accommodations: [],
    restaurants: [],
    specialties: [],
    services: [],
    souvenirs: []
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [CKEditorContent, setCKEditorContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTouristSpotById(editId);
        setFormData(data);
        setImagePreview(data.image);
        setCKEditorContent(data.description);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({
          ...formData,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setFormData({
        ...formData,
        image: ''
      });
    }
  };

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setCKEditorContent(data);
    setFormData({
      ...formData,
      description: data
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTouristSpot(editId, formData);
      alert('Đã cập nhật địa điểm du lịch thành công');
      setCurrentView('list');
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi cập nhật địa điểm du lịch');
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
              <h6 className="fs-17 fw-semi-bold mb-0">Chỉnh Sửa Địa Điểm Du Lịch</h6>
            </div>
            <div className="card-body">
              <div className="row g-4">
                <div className="col-sm-6">
                  <div className="">
                    <label className="required fw-medium mb-2">Tên Địa Điểm</label>
                    <input type="text" className="form-control" name="name" value={formData.name} placeholder="Tên" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="">
                    <label className="required fw-medium mb-2">Danh mục</label>
                    <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
                    <option value="Du lịch văn hóa">Du lịch văn hóa</option>
                      <option value="Du lịch tôn giáo">Du lịch tôn giáo</option>
                      <option value="Du lịch sinh thái">Du lịch sinh thái</option>
                      <option value="Làng nghề">Làng nghề</option>
                    </select>
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
                <div className="col-sm-12">
                  <div className="d-flex justify-content-between">
                    <label className="required fw-medium mb-2">Hình Ảnh</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && <img className="image-all" src={imagePreview} alt="Preview" />}
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="">
                    <label className="required fw-medium mb-2">Địa Chỉ</label>
                    <input type="text" className="form-control" name="address" value={formData.address} placeholder="Địa chỉ" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="">
                    <label className="required fw-medium mb-2">Tọa Độ</label>
                    <input type="text" className="form-control" name="google_map" value={formData.google_map} placeholder="Tọa Độ" onChange={handleChange} required />
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

export default EditTouristSpot;
