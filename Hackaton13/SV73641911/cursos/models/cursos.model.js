const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const cursoSchema = new Schema({
    nombre: String,
    descripcion: String,
    imagen: Buffer,
    portada: String,
    valor: Number,
    disponible: Boolean
});


cursoSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
//

cursoSchema.set('toJSON', {
    virtuals: true
});

cursoSchema.findById = function (cb) {
    return this.model('Cursos').find({id: this.id}, cb);
};

const Curso = mongoose.model('Cursos', cursoSchema);


exports.findByName = (nombre) => {
    return Curso.find({nombre: nombre});
};

exports.findById = (id) => {
    return Curso.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createCurso = (cursoData) => {
    const curso = new Curso(cursoData);
    return curso.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Curso.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, Cursos) {
                if (err) {
                    reject(err);
                } else {
                    resolve(Cursos);
                }
            })
    });
};

exports.patchCurso = (id, cursoData) => {
    return Curso.findOneAndUpdate({
        _id: id
    }, cursoData);
};

exports.removeById = (cursoId) => {
    return new Promise((resolve, reject) => {
        Curso.deleteMany({_id: cursoId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

