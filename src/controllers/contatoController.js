const Contato = require("../models/ContatoModel");

exports.index = (req, res) => {
  res.render("contato", {
    user: {}
  });
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(() => res.redirect("/contato/index"));
      return;
    }

    req.flash("success", "Contato cadastrado com sucesso");
    req.session.save(() =>
      res.redirect(`/contato/index/${contato.contato._id}`)
    );
    return;
  } catch (error) {
    console.log(error);
    return res.render("404");
  }
};

exports.editIndex = async function (req, res) {
  if (!req.params.id) return res.render("404");

  const user = await Contato.buscaId(req.params.id);
  if (!user) return res.render("404");

  res.render("contato", { user });
};

exports.edit = async function (req, res) {
  try {
    if (!req.params.id) return res.render("404");
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);

    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(() => res.redirect("/contato/index/"));
      return;
    }

    req.flash("success", "Contato editado com sucesso");
    req.session.save(() =>
      res.redirect(`/contato/index/${contato.contato._id}`)
    );
    return;
  } catch (error) {
    console.log;
    res.render("404");
  }
};

exports.delete = async function (req, res) {
  if (!req.params.id) return res.render("404");

  const user = await Contato.delete(req.params.id);
  if (!user) return res.render("404");

  req.flash("success", "Contato apagado com sucesso");
  req.session.save(() => res.redirect("/"));
  return;
};
