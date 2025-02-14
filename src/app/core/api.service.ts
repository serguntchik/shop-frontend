import { Injectable, Injector } from '@angular/core';
import { ApiEndpoint, Config } from '../../environments/config.interface';
import { CONFIG_TOKEN } from './injection-tokens/config.token';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

/** Base class for services working with APIs */
@Injectable()
export abstract class ApiService {
  protected readonly config: Config;
  protected readonly http: HttpClient;

  protected constructor(
    protected readonly activatedRoute: ActivatedRoute,
    protected readonly injector: Injector
  ) {
    this.config = injector.get(CONFIG_TOKEN);
    this.http = injector.get(HttpClient);
  }

  endpointEnabled(api: ApiEndpoint): boolean {
    return this.config.apiEndpointsEnabled[api];
  }

  /** Combines API endpoint and path into a single URL */
  protected getUrl(api: ApiEndpoint, ...paths: string[]): string {
    return paths.reduce(
      (prev, curr) => Location.joinWithSlash(prev, curr),
      this.config.apiEndpoints[api]
    );
  }
}
