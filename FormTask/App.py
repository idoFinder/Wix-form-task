from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
import json
import Tables
import FormHandler


DEBUG = True
app = Flask(__name__)
engine = app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dataBase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)


@app.route("/")
def index():
    return redirect('/formList')


@app.route("/formBuilder", methods=['GET', 'POST'])
def form_builder():
    if request.method == 'POST':
        data = request.get_json()
        data_str = json.dumps(data)
        FormHandler.create_new_form(data_str)
        FormHandler.insert_to_formList(data['form_name'])
        return json.dumps(data)

    return render_template('FormBuilderPage.html')


@app.route("/submit/<form_id>", methods=['GET', 'POST'])
def form_submit(form_id):
    if request.method == 'POST':
        data = request.get_json()
        form_str = json.dumps(data)
        FormHandler.submit_form(form_id, form_str)
        FormHandler.update_submissions(form_id)
        return json.dumps(data)

    form_data = FormHandler.get_form_fields(form_id)
    fields_jsoned = json.loads(form_data.fields_data)

    return render_template("FormSubmitPage.html", form_data=fields_jsoned, form_id=form_data.form_id)


@app.route("/submissions/<form_id>", methods=['GET', 'POST'])
def form_submissions(form_id):
    form_data_str = Tables.FormSubmissions.query.filter_by(form_id=form_id).all()
    arr = []
    for row in form_data_str:
        arr.append(json.loads(row.form_input))

    return render_template('FormSubmissionPage.html', form_id=form_id, form_data=arr)


@app.route("/formList",  methods=['GET', 'POST'])
def forms_list():
    data = FormHandler.create_formsList_json()
    return render_template('FormListPage.html', forms_data=data)


@app.route("/finishSubmitting")
def finish_submitting():
    return render_template('FinishSubmitting.html')

# ------ Run App -------- #
if __name__ == "__main__":
    app.run(debug=True)