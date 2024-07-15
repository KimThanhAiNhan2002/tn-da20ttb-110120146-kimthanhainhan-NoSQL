import React, { useState, useEffect, useCallback } from 'react';
import { getSouvenirById, updateSouvenir } from '../../../api/souvenirsApi';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Souvenir.css';

const EditSouvenir = ({ setCurrentView, editId, touristSpotId }) => {
  const [souvenir, setSouvenir] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [CKEditorContent, setCKEditorContent] = useState('');

  const fetchSouvenir = useCallback(async () => {
    try {
      const data = await getSouvenirById(touristSpotId, editId);
      setSouvenir(data);
      setImagePreview(data.image); // Hiển thị ảnh hiện tại
      setCKEditorContent(data.description);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin quà lưu niệm:', error);
    }
  }, [editId, touristSpotId]);

  useEffect(() => {
    if (touristSpotId && editId) {
      fetchSouvenir();
    }
  }, [fetchSouvenir, touristSpotId, editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSouvenir({ ...souvenir, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setSouvenir({
          ...souvenir,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setSouvenir({
        ...souvenir,
        image: ''
      });
    }
  };

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setCKEditorContent(data);
    setSouvenir({
      ...souvenir,
      description: data
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSouvenir(touristSpotId, editId, souvenir);
      alert('Đã cập nhật quà lưu niệm thành công');
      setCurrentView('list-souvenir');
    } catch (error) {
      console.error('Lỗi khi cập nhật quà lưu niệm:', error);
      alert('Có lỗi xảy ra khi cập nhật quà lưu niệm');
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
              <h6 className="fs-17 fw-semi-bold mb-0">Chỉnh sửa Quà Lưu Niệm</h6>
            </div>
            <div className="card-body">
              <div className="row g-4">
                <div className="col-sm-6">
                  <div className="">
                    <label className="required fw-medium mb-2">Tên Quà Lưu Niệm</label>
                    <input type="text" className="form-control" name="name" value={souvenir.name} placeholder="Tên" onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="">
                    <label className="required fw-medium mb-2">Giá</label>
                    <input type="text" className="form-control" name="price" value={souvenir.price} placeholder="Giá" onChange={handleChange} required />
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

export default EditSouvenir;
