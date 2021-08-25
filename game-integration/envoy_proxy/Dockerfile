FROM envoyproxy/envoy:v1.14-latest

# envoy configuration file in this folder context
ARG envoy_config_file

# docker-compose will not let you get environment variables on build time or build args as environment variables(alas the weird code)
# base_id should be environment variable since CMD is run on runtime, not on buildtime
ARG envoy_base_id
ENV ENVOY_BASE_ID ${envoy_base_id}

COPY ${envoy_config_file} /etc/envoy/envoy.yaml

# use -l {debug,info} for logging on terminal
CMD /usr/local/bin/envoy -c /etc/envoy/envoy.yaml --base-id ${ENVOY_BASE_ID}