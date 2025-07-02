from flask import Flask, render_template, request  # Import request from Flask

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/programs')
def programs():
    programs = [
        {
            'img': 'img/moje_cv_karate1.png',
            'title': 'Menadżer zadań',
            'description': 'Prosty menadżer do śledzenia zadań, z możliwością filtrowania po priorytecie i terminie.'
        },
        {
            'img': 'img/prog2.png',
            'title': 'Analiza danych',
            'description': 'Skrypt w Pythonie do ładowania plików CSV i generowania wykresów interaktywnych.'
        },
        {
            'img': 'img/prog3.png',
            'title': 'Aplikacja webowa Flask',
            'description': 'CV online z interaktywnymi modułami i wykresami umiejętności napisana we Flasku.'
        },
        # tutaj możesz dopisać kolejne obiekty z nowymi obrazkami
    ]
    return render_template('programs.html', programs=programs)

@app.route('/robotyka')
def robotyka():
    return render_template('robotyka.html')

@app.route('/prace', methods=['GET', 'POST'])
def prace():
    if request.method == 'POST':  # Check the request method
        # Handle POST request logic here
        return render_template('prace.html', message="POST request received")
    return render_template('prace.html')

if __name__ == '__main__':
    app.run(debug=True)