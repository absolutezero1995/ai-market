const React = require('react');
const ReactDOMServer = require('react-dom/server');

function renderComponent(component, props, options = { doctype: true }) {
  const element = React.createElement(component, {
    ...props,
    ...this.locals,
    ...this.app.locals,
  });
  const html = ReactDOMServer.renderToStaticMarkup(element);
  return options.doctype ? `<!DOCTYPE html>${html}` : html;
}

function ssr(req, res, next) {
  res.renderComponent = renderComponent;
  next();
}

module.exports = ssr;
