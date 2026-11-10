
import { Component, OnInit } from '@angular/core';

declare global {
  interface Window {
    chatwootSDK?: {
      run: (config: {
        websiteToken: string;
        baseUrl: string;
      }) => void;
    };
  }
}

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css']
})
export class WhatsappComponent implements OnInit {

  private readonly baseUrl = 'https://chat.miriasolutions.com';
  private readonly websiteToken = 'r7yLQEPovABaUhiPhQnBJwzC';

  ngOnInit(): void {
    this.loadChatwoot();
  }

  private loadChatwoot(): void {
    // Evita inicializar el servicio más de una vez.
    if (window.chatwootSDK) {
      window.chatwootSDK.run({
        websiteToken: this.websiteToken,
        baseUrl: this.baseUrl
      });
      return;
    }

    // Si el SDK ya está cargándose, esperamos a que termine.
    const existingScript = document.querySelector(
      'script[data-chatwoot-sdk]'
    ) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener('load', () => {
        this.initializeChatwoot();
      }, { once: true });

      return;
    }

    const script = document.createElement('script');
    script.src = `${this.baseUrl}/packs/js/sdk.js`;
    script.async = true;
    script.setAttribute('data-chatwoot-sdk', 'true');

    script.onload = () => {
      this.initializeChatwoot();
    };

    script.onerror = () => {
      console.error('No se pudo cargar el SDK de Chatwoot.');
    };

    document.head.appendChild(script);
  }

  private initializeChatwoot(): void {
    if (!window.chatwootSDK) {
      console.error('El SDK de Chatwoot no está disponible.');
      return;
    }

    window.chatwootSDK.run({
      websiteToken: this.websiteToken,
      baseUrl: this.baseUrl
    });
  }
}
