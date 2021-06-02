/* eslint-disable max-len */
const {nanoid} = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
  const {title, tags, body} = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  // mendapatkan nilai id
  const {id} = request.params;

  // mendapatkan objek note dgn nilai id menggunakan method array filter()
  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      message: 'Catatan berhasil didapatkan',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tydac ditemukan :(',
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  // mendapatkan nilai id
  const {id} = request.params;

  // eslint-disable-next-line max-len
  // mendapatkan data notes terbaru yang dikirimkan oleh client melalui body request
  const {title, tags, body} = request.payload;
  // memperbarui nilai dari properti updatedAt dan memndaptkan nilai terbaru dengan menggunakan new Date().toISOString()
  const updatedAt = new Date().toISOString();

  // mendapatakan index array pada objek catatatn sesuai id yg dtentukan menggunakan method findIndex()
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'yee.. Catatan berhasil diperbaharui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbaharui catatan. Id tydac ditemukan :(',
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const {id} = request.params;

  const index = notes.findIndex((note) => note.id === id);

  // melakukan pengecekan trhdp nilai index dan memastikan nilainya tidak -1 lalu menghapus data pada array berdasarkan index enggunakan method array splice()
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan :D',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'hufft.. Catatan gagal dihapus. Id tydac ditemukan :(',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
