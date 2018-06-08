import App
import Tables

# -------------------------------------------------------- #
# ----------- Handling Database queries ------------------ #
# -------------------------------------------------------- #


def create_new_form(data):
    new_form = Tables.FormStructure(data)
    App.db.session.add(new_form)
    App.db.session.commit()


def insert_to_formList(name):
    form = Tables.FormsList(name)
    App.db.session.add(form)
    App.db.session.commit()


def submit_form(form_id, form_input):
    submit = Tables.FormSubmissions(form_id, form_input)
    App.db.session.add(submit)
    App.db.session.commit()


def get_form_fields(form_id):
    form_fields = Tables.FormStructure.query.filter_by(form_id=form_id).first()
    return form_fields


def update_submissions(form_id):
    temp = Tables.FormsList.query.filter_by(Form_id=form_id).first()
    temp.Form_submissions = temp.Form_submissions + 1
    App.db.session.commit()


def create_formsList_json():
    form_data_str = Tables.FormsList.query.all()
    arr = []

    for row in form_data_str:
        form = {}
        form['form_id'] = row.Form_id
        form['form_name'] = row.Form_name
        form['submissions'] = row.Form_submissions
        arr.append(form)

    return arr

