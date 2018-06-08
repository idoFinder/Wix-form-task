from App import db


class FormStructure(db.Model):

    __tablename__ = 'FormStructure'
    form_id = db.Column("form_id", db.Integer, primary_key=True, autoincrement=True)
    fields_data = db.Column('fields_data', db.Unicode)

    def __init__(self, fields_data):
        self.form_id = None
        self.fields_data = fields_data


class FormSubmissions(db.Model):

    __tablename__ = 'FormSubmissions'
    submission_id = db.Column("Submission_ID", db.Integer, primary_key=True, autoincrement=True)
    form_id = db.Column('form_id', db.Integer)
    form_input = db.Column('form_input', db.Unicode)

    def __init__(self, form_id, form_input):
        self.submission_id = None
        self.form_id = form_id
        self.form_input = form_input


class FormsList(db.Model):

    __tablename__ = 'FormsList'
    Form_id = db.Column("Form Id", db.Integer, primary_key=True, autoincrement=True)
    Form_name = db.Column('Form Name', db.Integer)
    Form_submissions = db.Column('#Submissions', db.Integer)

    def __init__(self, form_name):
        self.Form_id = None
        self.Form_name = form_name
        self.Form_submissions = 0


db.create_all()
