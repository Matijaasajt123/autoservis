document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('forma');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Sprečava podrazumevano slanje forme

        // Prikupljanje podataka iz forme
        const formData = new FormData(form);
        const ime = formData.get('ime');
        const telefon = formData.get('telefon');
        const poruka = formData.get('poruka');

        // Validacija - provera da li su polja popunjena
        if (!ime || !telefon || !poruka) {
            formStatus.textContent = 'Molimo vas, popunite sva obavezna polja.';
            formStatus.style.color = 'red';
            return;
        }

        // Simulacija slanja podataka na server
        formStatus.textContent = 'Slanje poruke...';
        formStatus.style.color = 'orange';

        setTimeout(() => {
            // Ovde bi u realnoj aplikaciji išao AJAX poziv ka serveru
            // Na primer: fetch('/api/kontakt', { method: 'POST', body: formData })
            
            // Prikaz poruke o uspešnom slanju
            formStatus.textContent = 'Hvala! Vaša poruka je uspešno poslata. Kontaktiraćemo vas uskoro.';
            formStatus.style.color = 'green';
            
            // Resetovanje forme
            form.reset();

            // Vraćanje poruke na početno stanje nakon nekoliko sekundi
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);

        }, 1500); // Simulacija kašnjenja mreže od 1.5 sekunde
    });

    // Animiranje elemenata pri skrolovanju (opciono, ali daje lep efekat)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section > *, .service-card, .feature, .step, .testimonial, .gallery-grid img').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

